# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > If > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = 1 && 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = 1 && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  a = 2;
}
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
let tmpSSA_a = 1;
if (tmpSSA_a) {
  tmpSSA_a = 2;
}
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
