# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > statement > throw > auto_ident_logic_and_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(1)) && $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpThrowArg = tmpCallCallee(tmpCalleeParam);
if (tmpThrowArg) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpThrowArg = tmpCallCallee$1(tmpCalleeParam$1);
}
throw tmpThrowArg;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
