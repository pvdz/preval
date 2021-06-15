# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Arr spread > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
[...(b = 2)];
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
[...(b = 2)];
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
let tmpArrElToSpread = b;
[...tmpArrElToSpread];
$(a, b, c);
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
