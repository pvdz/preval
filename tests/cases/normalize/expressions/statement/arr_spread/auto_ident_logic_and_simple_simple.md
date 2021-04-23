# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && 2)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && 2)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = 1;
if (tmpArrElToSpread) {
  tmpArrElToSpread = 2;
} else {
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
[...2];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
