# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > logic_or_left > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) || $(100));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
b = 2;
a = 2;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same