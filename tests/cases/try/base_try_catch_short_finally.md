# Preval test case

# base_try_catch_short_finally.md

> try > base_try_catch_short_finally
>
> Try base cases

#TODO

## Input

`````js filename=intro
$(1);
try {
  $(2);
} catch {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Normalized

`````js filename=intro
$(1);
try {
  $(2);
} catch {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
