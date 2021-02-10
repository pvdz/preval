# Preval test case

# labeled.md

> labels > labeled
>
> Make sure the labeled `if` doesn't screw up transforms

#TODO

## Input

`````js filename=intro
$(0);
foo: if (x) {
  $(1);
  break foo;
}
$(2);
`````

## Normalized

`````js filename=intro
$(0);
foo: {
  if (x) {
    $(1);
    break foo;
  }
}
$(2);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
