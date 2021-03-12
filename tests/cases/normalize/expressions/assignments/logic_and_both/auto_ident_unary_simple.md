# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof x) && (a = typeof x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = typeof x) && (a = typeof x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof x;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = typeof x;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let SSA_a = 'number';
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  SSA_a = 'number';
  tmpCalleeParam = 'number';
}
$(tmpCalleeParam);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
