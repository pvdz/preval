# Preval test case

# dupe_label.md

> labels > dupe_label
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: break foo;
foo: break foo;
foo: break foo;
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
foo_1: {
  break foo_1;
}
foo_2: {
  break foo_2;
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
