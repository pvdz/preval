# Preval test case

# try_break_out.md

> Ref tracking > Try break out
>
> The challenge here is that the finally breaks outside of the finally
> and therefor changes the continuation, whether there was a break to A
> or not. Even the throw would be picked up and changed. (May need to
> test that explicitly, but ok)

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  A: {
    $(x); // x=1
    x = 2;
    B: {
      try {
        $(x); // x=2
        if (x) { // x=2
          x = 3;
          break A;
        }
        x = 4;
      } finally {
        if ($()) {
          $(x); // x=2 3 4
          // This overrides the original continuation, both the implicit (x=4)
          // and the break to A (x=3) and even the unexpected throw (x=2).
          break B;
        }
        $(x, 'in'); // x=2 3 4
      }
      // (NOT 3: either that breaks to A or to B)
      // (NOT 2: can only happen with an unexpected throw which would
      // either be overridden by the break to B (skips this) and else
      // would still throw after the finally completes)
      // Not sure if I can manage that but I also don't really have a choice 
      $(x, 'post'); // x=4
    }
    $(x); // x=3 4
    x = 5;
  }
  // If try throws immediately, then x=2 and if break overrides, then x=5
  // If try breaks then x=3. Either finally breaks then x=5 or not then x=3
  // If try doesnt break then x=4, then either way x=5, so 4 is not visible
  $(x); // x=3 5
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
A___11__: /*12*/ {
  $(x___16__);
  x___20__ = 2;
  B___22__: /*23*/ {
    try /*25*/ {
      $(x___29__);
      if (x___31__) {
        /*32*/ x___36__ = 3;
        break A___38__;
      } /*39*/ else {
        x___43__ = 4;
      }
    } finally /*44*/ {
      const tmpIfTest___47__ = $();
      if (tmpIfTest___51__) {
        /*52*/ $(x___56__);
        break B___58__;
      } /*59*/ else {
        $(x___63__, `in`);
      }
    }
    $(x___69__, `post`);
  }
  $(x___75__);
  x___79__ = 5;
}
$(x___83__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,16        | none           | 20
  - r @9       | 4
  - r @16      | 4
  - w @20      | ########## | 29,31,56,63,75 | 4              | 36,43,79
  - r @29      | 20
  - r @31      | 20
  - w @36      | ########## | 56,63,83    | 20             | none
  - w @43      | ########## | 56,63,69,75 | 20             | 79
  - r @56      | 20,36,43
  - r @63      | 20,36,43
  - r @69      | 43
  - r @75      | 20,43
  - w @79      | ########## | 83          | 20,43          | none
  - r @83      | 36,79

tmpIfTest:
  - w @47      | ########## | 51          | none           | none
  - r @51      | 47
