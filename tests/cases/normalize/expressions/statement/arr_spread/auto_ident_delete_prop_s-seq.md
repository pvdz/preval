# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > arr_spread > auto_ident_delete_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
[...delete ($(1), $(2), x).y];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = x;
const tmpArrElToSpread = delete tmpDeleteObj.y;
[...tmpArrElToSpread];
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = x;
const tmpArrElToSpread = delete tmpDeleteObj.y;
[...tmpArrElToSpread];
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
