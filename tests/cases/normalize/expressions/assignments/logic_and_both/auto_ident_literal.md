# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") && (a = "foo"));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 'foo';
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  a = 'foo';
  tmpCalleeParam = 'foo';
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 'foo';
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  SSA_a = 'foo';
  tmpCalleeParam = 'foo';
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
