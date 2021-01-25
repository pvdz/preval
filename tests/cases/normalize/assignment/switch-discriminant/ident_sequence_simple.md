# Preval test case

# ident_sequence_simple.md

> normalize > assignment > switch-discriminant > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch (a = ($(b), c)) {}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
a = c;
const tmpSwitchTest = c;
{
  let tmpFallthrough = false;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$(2);
a = 3;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
