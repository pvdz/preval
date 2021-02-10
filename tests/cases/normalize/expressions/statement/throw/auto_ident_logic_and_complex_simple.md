# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > statement > throw > auto_ident_logic_and_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(1)) && 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpThrowArg = tmpCallCallee(tmpCalleeParam);
if (tmpThrowArg) {
  tmpThrowArg = 2;
}
throw tmpThrowArg;
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
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
