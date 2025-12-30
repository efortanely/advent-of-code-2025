from functools import cache

def puzzle_1(lines):
    total_splits = 0
    beams = set([lines[0].find("S")])
    
    for i in range(2, len(lines) - 1, 2):
        indices = [idx for idx, c in enumerate(lines[i]) if c == "^"]
        new_beams = set([beam for beam in beams if beam not in indices])

        for splitter in indices:
            if splitter in beams:
                total_splits += 1
                new_beams.add(splitter - 1)
                new_beams.add(splitter + 1)
        
        beams = new_beams

    return total_splits

def puzzle_2(lines):
    @cache
    def new_timeline(beam, line):
        indices = [idx for idx, c in enumerate(lines[line]) if c == "^"]

        if beam not in indices:
            return [beam]
        else:
            return [beam - 1, beam + 1]

    timelines = {}
    beam = lines[0].find("S")

    for i in range(2, len(lines) - 1, 2):
        if not timelines:
            for pos in new_timeline(beam, i):
                timelines[pos] = timelines.get(pos, 0) + 1
        else:
            new_timelines = {}

            for timeline, count in timelines.items():
                for pos in new_timeline(timeline, i):
                    new_timelines[pos] = new_timelines.get(pos, 0) + count

            timelines = new_timelines

    return sum(timelines.values())

if __name__ == "__main__":
    with open("input-12.txt", "r") as f:
        lines = f.readlines()
        print(puzzle_1(lines))
        print(puzzle_2(lines))
