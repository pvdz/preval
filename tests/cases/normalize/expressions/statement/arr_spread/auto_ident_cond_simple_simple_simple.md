# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident cond simple simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 ? 2 : $($(100)))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 ? 2 : $($(100)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
tmpArrElToSpread = 2;
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
[...2];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
