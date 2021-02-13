# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> normalize > expressions > statement > logic_or_both > auto_ident_call_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)["$"](1) || (1, 2, b)["$"](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = b;
const tmpIfTest = tmpCallObj['$'](1);
if (tmpIfTest) {
} else {
  const tmpCallObj$1 = b;
  tmpCallObj$1['$'](1);
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = b['$'](1);
if (tmpIfTest) {
} else {
  b['$'](1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
