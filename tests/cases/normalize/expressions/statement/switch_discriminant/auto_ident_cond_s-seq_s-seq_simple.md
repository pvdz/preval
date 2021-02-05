# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((10, 20, 30) ? (40, 50, 60) : $($(100))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
10;
20;
const tmpIfTest = 30;
if (tmpIfTest) {
  40;
  50;
  tmpSwitchTest = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
}
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
tmpSwitchTest = 60;
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
