export default function FiltreNomPodcast({ nom, setNom }) {
  return (
    <div className="field is-horizontal">
      <div className="control">
        <input
          className="input is-rounded"
          type="text"
          placeholder="Nom du podcast"
          value={nom}
          onChange={(event) => {
            setNom(event.target.value);
          }}
        />
      </div>
    </div>
  );
}
