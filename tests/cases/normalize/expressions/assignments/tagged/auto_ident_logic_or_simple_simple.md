# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > assignments > tagged > auto_ident_logic_or_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 0 || 2)} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same