from bisect import  bisect_right

def puzzle_1(content):
    num_fresh = 0
    ranges_input, ids_input = content.strip().split("\n\n")
    fresh_ranges = [[int(x) for x in r.split("-")] for r in ranges_input.split("\n")]
    fresh_ranges.sort(key=lambda x: x[0])
    i = 0

    while i < len(fresh_ranges):
        if i + 1 < len(fresh_ranges) and fresh_ranges[i+1][0] <= fresh_ranges[i][1]:
            fresh_ranges[i][1] = max(fresh_ranges[i][1], fresh_ranges[i+1][1])
            del fresh_ranges[i+1]
        else:
            i += 1
    
    for line in ids_input.split("\n"):
        id = int(line)
        idx = bisect_right(fresh_ranges, id, key=lambda r: r[0]) - 1

        if idx >= 0 and fresh_ranges[idx][0] <= id <= fresh_ranges[idx][1]:
            num_fresh += 1
    
    return num_fresh

def puzzle_2(content):
    num_fresh = 0
    ranges_input, _ = content.strip().split("\n\n")
    fresh_ranges = [[int(x) for x in r.split("-")] for r in ranges_input.split("\n")]
    fresh_ranges.sort(key=lambda x: x[0])
    i = 0

    while i < len(fresh_ranges):
        if i + 1 < len(fresh_ranges) and fresh_ranges[i+1][0] <= fresh_ranges[i][1]:
            fresh_ranges[i][1] = max(fresh_ranges[i][1], fresh_ranges[i+1][1])
            del fresh_ranges[i+1]
        else:
            num_fresh += fresh_ranges[i][1] - fresh_ranges[i][0] + 1
            i += 1
    
    return num_fresh

if __name__ == "__main__":
    with open("input-8.txt", "r") as f:
        content = f.read()
        print(puzzle_1(content))
        print(puzzle_2(content))