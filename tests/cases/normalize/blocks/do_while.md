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
var ifTestTmp;
do {
  $(1);
  ifTestTmp = $(2);
} while (ifTestTmp);
`````

## Output

`````js filename=intro
var ifTestTmp;
do {
  $(1);
  ifTestTmp = $(2);
} while (ifTestTmp);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: undefined

Normalized calls: Same

Final output calls: Same
