# Preval test case

# auto_ident_call_prop_simple.md

> normalize > expressions > statement > ternary_a > auto_ident_call_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b.$(1) ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = b.$(1);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = b.$(1);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
