# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > assignments > switch_default > auto_ident_logic_and_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = 1 && $($(1));
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    a = 1;
    if (a) {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(1);
      a = tmpCallCallee(tmpCalleeParam);
    }
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
