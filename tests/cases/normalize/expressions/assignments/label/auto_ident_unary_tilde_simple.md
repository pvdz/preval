# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > assignments > label > auto_ident_unary_tilde_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
label: a = ~arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
$(a, arg);
`````

## Output

`````js filename=intro
$(-2, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
