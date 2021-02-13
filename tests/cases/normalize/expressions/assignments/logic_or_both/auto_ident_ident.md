# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > logic_or_both > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b) || (a = b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  a = b;
  tmpCalleeParam = b;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  a = 1;
  tmpCalleeParam = 1;
}
$(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
