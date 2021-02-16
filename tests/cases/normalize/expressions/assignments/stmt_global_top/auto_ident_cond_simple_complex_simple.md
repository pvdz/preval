# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > assignments > stmt_global_top > auto_ident_cond_simple_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1 ? $(2) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(2);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
