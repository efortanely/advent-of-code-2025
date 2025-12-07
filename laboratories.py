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

if __name__ == "__main__":
    with open("input-12.txt", "r") as f:
        lines = f.readlines()
        print(puzzle_1(lines))
