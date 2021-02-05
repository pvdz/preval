# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > statement > tagged > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(10, 20, 30) ? (40, 50, 60) : $($(100))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
10;
20;
const tmpIfTest = 30;
if (tmpIfTest) {
  40;
  50;
  tmpCalleeParam$1 = 60;
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
tmpCalleeParam$1 = 60;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 60
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
