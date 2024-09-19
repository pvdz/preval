# Preval test case

# objlit_prop_assigns.md

> Obj mutation > Objlit prop assigns
>
> Should fold up assignments to a binding known to be object literal
> This is the trivial case where the objlit is the prev statement.

## Input

`````js filename=intro
const obj = {};
obj[`7H`] = `a`;
obj[`7G`] = `b`;
obj[`7F`] = `c`;
obj[`7E`] = `d`;
obj[`7D`] = `e`;
obj[`7C`] = `f`;
$(obj);
`````

## Pre Normal


`````js filename=intro
const obj = {};
obj[`7H`] = `a`;
obj[`7G`] = `b`;
obj[`7F`] = `c`;
obj[`7E`] = `d`;
obj[`7D`] = `e`;
obj[`7C`] = `f`;
$(obj);
`````

## Normalized


`````js filename=intro
const obj = { [`7H`]: `a`, [`7G`]: `b`, [`7F`]: `c`, [`7E`]: `d`, [`7D`]: `e`, [`7C`]: `f` };
$(obj);
`````

## Output


`````js filename=intro
const obj /*:object*/ = { [`7H`]: `a`, [`7G`]: `b`, [`7F`]: `c`, [`7E`]: `d`, [`7D`]: `e`, [`7C`]: `f` };
$(obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  [ "7H" ]: "a",
  [ "7G" ]: "b",
  [ "7F" ]: "c",
  [ "7E" ]: "d",
  [ "7D" ]: "e",
  [ "7C" ]: "f",
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { '7H': '"a"', '7G': '"b"', '7F': '"c"', '7E': '"d"', '7D': '"e"', '7C': '"f"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
