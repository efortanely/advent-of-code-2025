def puzzle_1(lines):
    curr_num = 50
    ans = 0

    for line in lines:
        line = line.strip()
        dir = -1 if line[0] == "L" else 1
        magnitude = int(line[1:])
        curr_num += dir * magnitude
        curr_num %= 100
        
        if not curr_num:
            ans += 1
                
    return ans

def puzzle_2(lines):
    curr_num = 50
    ans = 0

    for line in lines:
        line = line.rstrip()
        dir = line[0]
        magnitude = int(line[1:])

        if dir == "L":
            ans += ((100 - curr_num) % 100 + magnitude) // 100
            magnitude *= -1
        else:
            ans += (curr_num + magnitude) // 100

        curr_num = (curr_num + magnitude) % 100

    return ans

if __name__ == "__main__":
    with open("input-1.txt", "r") as f:
        lines = f.readlines()
        ans = puzzle_1(lines)
        print(ans)
        ans = puzzle_2(lines)
        print(ans)
