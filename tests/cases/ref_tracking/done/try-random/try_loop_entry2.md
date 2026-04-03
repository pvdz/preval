# Preval test case

# try_loop_entry2.md

> Ref tracking > Done > Try-random > Try loop entry2
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    try {
      $(x);   // x=1
    } catch {
      $(x);   // x=1
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~30*/ /* stmt(13): */ try /*14~18*/ {
    /* stmt(15): */ $(/*___18__*/ x);
  } catch (/*___20__*/ e) /*21~30*/ {
    /* stmt(22): */ $(/*___25__*/ x);
    /* stmt(26): */ /*___29__*/ x = 2;
    /* stmt(30): */ break;
  }
}
/* stmt(31): */ $(/*___34__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,25     | none           | 29
  - r @9       | 4
  - r @18      | 4
  - r @25      | 4
  - w @29      | ########## | 34          | 4              | none
  - r @34      | 29

e:
  - w @20      | ########## | not read    | none           | none
