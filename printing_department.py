def puzzle_1(lines):
    input = []
    ans = 0

    for line in lines:
        line = line.rstrip()
        input.append([line[i] for i in range(len(line))])

    for i in range(len(input)):
        for j in range(len(input[i])):
            if input[i][j] == ".":
                continue

            num_neighbors = 0

            for x_dir, y_dir in [(-1, -1), (-1, 0), (-1, 1), (0, 1),
                                 (0, -1), (1, 0), (1, -1), (1, 1)]:
                nbr_x = i + x_dir
                nbr_y = j + y_dir

                if nbr_x < 0 or nbr_x >= len(input):
                    continue

                if nbr_y < 0 or nbr_y >= len(input[i]):
                    continue
                
                if input[nbr_x][nbr_y] == "@":
                    num_neighbors += 1

                if num_neighbors >= 4:
                    break

            if num_neighbors <= 3:
                ans += 1
    
    return ans

def puzzle_2(lines):
    input = []
    rolls_removed = 0

    for line in lines:
        line = line.rstrip()
        input.append([line[i] for i in range(len(line))])

    while True:
        nodes_to_remove = []

        for i in range(len(input)):
            for j in range(len(input[i])):
                if input[i][j] == ".":
                    continue

                num_neighbors = 0

                for x_dir, y_dir in [(-1, -1), (-1, 0), (-1, 1), (0, 1),
                                     (0, -1), (1, 0), (1, -1), (1, 1)]:
                    nbr_x = i + x_dir
                    nbr_y = j + y_dir

                    if nbr_x < 0 or nbr_x >= len(input):
                        continue

                    if nbr_y < 0 or nbr_y >= len(input[i]):
                        continue

                    if input[nbr_x][nbr_y] == "@":
                        num_neighbors += 1

                    if num_neighbors >= 4:
                        break

                if num_neighbors <= 3:
                    nodes_to_remove.append((i, j))

        if not nodes_to_remove:
            break

        for node in nodes_to_remove:
            input[node[0]][node[1]] = "."
            rolls_removed += 1

    return rolls_removed

if __name__ == "__main__":
    with open("input-6.txt", "r") as f:
        lines = f.readlines()
        print(puzzle_1(lines))
        print(puzzle_2(lines))