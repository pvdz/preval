# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > statement > arr_spread > auto_ident_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
[...(1, 2, b)[$("c")]];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpArrElToSpread = tmpCompObj[tmpCompProp];
[...tmpArrElToSpread];
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompProp = $('c');
const tmpArrElToSpread = b[tmpCompProp];
[...tmpArrElToSpread];
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
