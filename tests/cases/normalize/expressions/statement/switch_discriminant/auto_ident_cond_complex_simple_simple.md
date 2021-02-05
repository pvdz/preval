# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > statement > switch_discriminant > auto_ident_cond_complex_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1) ? 2 : $($(100))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpSwitchTest = 2;
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpSwitchTest = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
}
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
