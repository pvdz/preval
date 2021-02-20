# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(0 || 2)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = 0;
if (tmpArrElToSpread) {
} else {
  tmpArrElToSpread = 2;
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpArrElToSpread = 0;
if (tmpArrElToSpread) {
} else {
  tmpArrElToSpread = 2;
}
[...tmpArrElToSpread];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
