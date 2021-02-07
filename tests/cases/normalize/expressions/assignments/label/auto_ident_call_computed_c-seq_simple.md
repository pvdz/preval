# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> normalize > expressions > assignments > label > auto_ident_call_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
label: a = (1, 2, $(b))["$"](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
label: {
  1;
  2;
  const tmpCallObj = $(b);
  a = tmpCallObj['$'](1);
}
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
label: {
  1;
  2;
  const tmpCallObj = $(b);
  a = tmpCallObj['$'](1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')
