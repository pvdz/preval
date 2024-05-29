# Preval test case

# try_inside_break.md

> Ref tracking > Try inside break
>
> The challenge of this test is that the break to B inside the finally
> does not affect the break to A. This means that the write x=3 is not 
> overwritten by x=5 later, unlike the x=4 write which is overwritten.
> The x=2 case is observed inside the finally but then crashes so it 
> is not observed by the final read.
> Hence the final read can only see x=3 and x=5

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);
  A: {
    $(x);
    x = 2;
    try {
      $(x);
      if (x) {
        x = 3;
        break A;
      }
      x = 4;
    } finally {
      B: {
        if ($()) {
          $(x); // x=2 3 4
          // Does not change outer break continuation
          // That break should still go to after `A` and
          // the natural completion should still continue
          // after the Try.
          // Each with their appropriate exitWrites ...
          break B;
        }
        $(x, 'in'); // x=2 3 4
      }
      $(x, 'out'); // x=2 3 4
    }
    // NOT 2, that can only be a throw, which after the finally would continue
    //        the throw so not reach here.
    // NOT 3, breaks to A
    $(x); // x=4
    x = 5;
  }
  // Either the try trips immediately, then x=2 into finally into throw
  // Or the try breaks, then x=3 into finally into A
  // Or the try completes naturally, then x=4 into finally into x=5
  // The finally does not change x
  // The x=2 case would throw so it's not further observed after finally
  // The x=3 case jumps over x=5 and goes straight to the end after finally
  // The x=4 case goes naturally into x=5
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
  try /*22*/ {
    $(x___26__);
    if (x___28__) {
      /*29*/ x___33__ = 3;
      break A___35__;
    } /*36*/ else {
      x___40__ = 4;
    }
  } finally /*41*/ {
    B___43__: /*44*/ {
      const tmpIfTest___47__ = $();
      if (tmpIfTest___51__) {
        /*52*/ $(x___56__);
        break B___58__;
      } /*59*/ else {
        $(x___63__, `in`);
      }
    }
    $(x___69__, `out`);
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
  - w @20      | ########## | 26,28,56,63,69 | 4              | 33,40
  - r @26      | 20
  - r @28      | 20
  - w @33      | ########## | 56,63,69,83 | 20             | none
  - w @40      | ########## | 56,63,69,75 | 20             | 79
  - r @56      | 20,33,40
  - r @63      | 20,33,40
  - r @69      | 20,33,40
  - r @75      | 40
  - w @79      | ########## | 83          | 40             | none
  - r @83      | 33,79

tmpIfTest:
  - w @47      | ########## | 51          | none           | none
  - r @51      | 47
