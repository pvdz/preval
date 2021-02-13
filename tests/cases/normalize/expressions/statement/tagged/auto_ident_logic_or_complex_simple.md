# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > tagged > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(0)) || 2} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(0);
let tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
if (tmpCalleeParam$1) {
} else {
  tmpCalleeParam$1 = 2;
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = $(0);
let tmpCalleeParam$1 = $(tmpCalleeParam$2);
if (tmpCalleeParam$1) {
} else {
  tmpCalleeParam$1 = 2;
}
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: ['before ', ' after'], 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same