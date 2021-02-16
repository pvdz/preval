# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > statement > ternary_a > auto_ident_unary_tilde_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
~arg ? $(100) : $(200);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpIfTest = ~arg;
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(100);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
