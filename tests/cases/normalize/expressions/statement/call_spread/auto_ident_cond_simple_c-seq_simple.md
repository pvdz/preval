# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > statement > call_spread > auto_ident_cond_simple_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
{
  tmpCalleeParamSpread = $(60);
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
tmpCalleeParamSpread = $(60);
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 60
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
