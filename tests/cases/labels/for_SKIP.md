# Preval test case

# labeled.md

> labels > labeled
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

#TODO

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (1) break foo;
  else continue foo;
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
$(0);
foo: {
  if (x) {
    $(1);
    break foo;
  }
}
$(2);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
