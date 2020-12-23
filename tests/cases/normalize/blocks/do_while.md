# Preval test case

# do_while.md

> normalize > blocks > do_while
>
> Add blocks to sub-statements

## Input

`````js filename=intro
do $(1);
while ($(2));
`````

## Normalized

`````js filename=intro
do {
  $(1);
} while ($(2));
`````

## Output

`````js filename=intro
do {
  $(1);
} while ($(2));
`````
