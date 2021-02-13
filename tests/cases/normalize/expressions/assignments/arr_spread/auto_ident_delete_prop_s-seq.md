# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > arr_spread > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$([...(a = delete ($(1), $(2), arg).y)]);
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
