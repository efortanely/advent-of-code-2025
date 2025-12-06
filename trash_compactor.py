import math

def puzzle_1(lines):
    input = [[op, 0 if op == "+" else 1] for op in lines[-1].split()]

    for line in lines[:-1]:
        for i, num in enumerate(line.split()):
            if input[i][0] == "+":
                input[i][1] += int(num)
            else:
                input[i][1] *= int(num)

    return sum([input[i][1] for i in range(len(input))])

def puzzle_2(lines):
    lines = [line.replace("\n", "") for line in lines]
    n = len(lines[0])
    input = [[op, []] for op in lines[-1].split()[::-1]]
    ans = 0
    equations_passed = 0

    for col in range(n-1, -1, -1):
        digit = ""
        all_spaces = True

        for row in range(len(lines) - 1):
            if lines[row][col] == " ":
                continue
            
            digit += lines[row][col]
            all_spaces = False

        if all_spaces:
            equations_passed += 1
            continue

        input[equations_passed][1].append(int(digit))

    for op, nums in input:
        ans += sum(nums) if op == "+" else math.prod(nums)
    
    return ans

if __name__ == "__main__":
    with open("input-10.txt", "r") as f:
        lines = f.readlines()
        print(puzzle_1(lines))
        print(puzzle_2(lines))