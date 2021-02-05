# Preval test case

# auto_ident_call_prop_c-seq.md

> normalize > expressions > statement > stmt_global_block > auto_ident_call_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = { a: 999, b: 1000 };
  (1, 2, $(b)).$(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  1;
  2;
  const tmpCallObj = $(b);
  tmpCallObj.$(1);
  $(a);
}
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
tmpCallObj.$(1);
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
