# Preval test case

# redundant_continue_label.md

> labels > redundant_continue_label
>
> The label is necessary here since an unqualified continue would implicitly target the inner loop.

#TODO

## Input

`````js filename=intro
foo: do {
  do {
    $(1);
    continue foo;
  } while (false);
} while (false);
`````

## Normalized

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while (false);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
