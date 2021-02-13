# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > logic_and_both > auto_ident_literal
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
let a = { a: 999, b: 1000 };
a = 'foo';
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  a = 'foo';
  tmpCalleeParam = 'foo';
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same