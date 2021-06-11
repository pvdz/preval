# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(1)) && 2)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(1)) && 2)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
if (tmpArrElToSpread) {
  tmpArrElToSpread = 2;
} else {
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
  tmpArrElToSpread = 2;
} else {
}
[...tmpArrElToSpread];
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
