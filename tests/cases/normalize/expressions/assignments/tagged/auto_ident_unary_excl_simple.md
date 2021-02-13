# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > assignments > tagged > auto_ident_unary_excl_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = !arg)} after`;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = !arg;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
a = !arg;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: ['before ', ' after'], false
 - 2: false, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
