# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > assignments > tagged > auto_ident_unary_typeof_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = typeof $(arg))} after`;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const tmpUnaryArg = $(1);
const SSA_a = typeof tmpUnaryArg;
$(tmpCalleeParam, SSA_a);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 'number'
 - 3: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
