# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > statement > logic_and_both > auto_ident_cond_simple_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? (40, 50, $(60)) : $($(100))) && (1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
{
  tmpIfTest = $(60);
}
if (tmpIfTest) {
  {
    $(60);
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
 - 1: 60
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
