def puzzle_1(lines):
    sum = 0

    for line in lines:
        line = line.rstrip()
        left = -1
        right = -1
        search_digit = 9

        while left == -1:
            left = line.find(str(search_digit), 0, len(line) - 1)
            search_digit -= 1

        search_digit = 9

        while right == -1:
            right = line.find(str(search_digit), left + 1)
            search_digit -= 1

        sum += int(line[left] + line[right])

    return sum

def puzzle_2(lines):
    sum = 0

    for line in lines:
        line = line.rstrip()
        batteries = [-1 for _ in range(12)]
        
        for i in range(12):
            search_digit = 9

            while batteries[i] == -1:
                batteries[i] = line.find(str(search_digit), batteries[i-1] + 1 if i-1 >= 0 else 0, len(line) - (11 - i))
                search_digit -= 1

        sum += int("".join([str(line[battery]) for battery in batteries]))

    return sum

if __name__ == "__main__":
    with open("input-4.txt", "r") as f:
        lines = f.readlines()
        print(puzzle_1(lines))
        print(puzzle_2(lines))