# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > statement > tagged > auto_ident_cond_simple_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 ? $(2) : $($(100))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
if (1) {
  tmpCalleeParam$1 = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$2 = $(100);
  tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
tmpCalleeParam$1 = $(2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: ['before ', ' after'], 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
