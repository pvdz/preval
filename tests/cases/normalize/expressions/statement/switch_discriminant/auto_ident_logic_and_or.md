# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > statement > switch_discriminant > auto_ident_logic_and_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (($($(1)) && $($(1))) || $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpSwitchTest = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpSwitchTest = tmpCallCallee$1(tmpCalleeParam$1);
}
if (tmpSwitchTest) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpSwitchTest = tmpCallCallee$2(tmpCalleeParam$2);
}
{
  let tmpFallthrough = false;
  {
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
