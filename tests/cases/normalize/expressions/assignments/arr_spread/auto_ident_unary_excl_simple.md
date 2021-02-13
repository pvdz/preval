# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > assignments > arr_spread > auto_ident_unary_excl_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$([...(a = !arg)]);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = !arg;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = !arg;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
